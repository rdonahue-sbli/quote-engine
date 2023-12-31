"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import React, { useContext, useEffect, useRef, useState } from "react";
import { QuickQuoteSchema } from "~/schema/forms/QuickQuote";
import { z } from "zod";
import {
  GenderSchema,
  months,
  TermOptions,
  TermOptionsSchema,
  CoverageLabelsSchema,
  CoverageAmountSchema,
} from "~/schema/global";
import {
  CityStateErrorSchema,
  CityStateResultSchema,
} from "~/schema/locations";
import useAnalytics from "~/hooks/useAnalytics";
import { ClientProvider } from "../_trpc/provider";
import { trpc } from "../_trpc/client";
import { serverClient } from "~/server/api/server";
import { serialize } from "v8";

export default function QuickQuote({ phoneNumber }: { phoneNumber: string}) {
  const { analytics } = useAnalytics();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof QuickQuoteSchema>>({
    mode: "onBlur",
    resolver: zodResolver(QuickQuoteSchema),
  });

  const [quote, setQuote] = useState([0]);
  const [queryParams, setQueryParams] = useState<undefined | string>(undefined);
  const [coverage, setCoverage] = useState(0);
  const [term, setTerm] = useState(0);
  const requestQuoteForm = useRef<HTMLFormElement>(null);

  const {
    mutate: getQuote,
    error,
    data,
    isLoading,
  } = trpc.rates.getRate.useMutation();
  const { mutate: createLead } = trpc.tap.createLead.useMutation();

  useEffect(() => {
    analytics.page();
  }, [analytics]);

  const handleValidSubmit: SubmitHandler<
    z.infer<typeof QuickQuoteSchema>
  > = async (data, e) => {

    setQueryParams(undefined)

    getQuote(data, {
      onSuccess: (quote) => {
        setQuote(quote)
        const { birthdate, isNicotineUser, hasHealthIssues, coverage, ...rest } = data 
        const searchParams = new URLSearchParams({
          ...rest,
          coverage: coverage.toString(),
          isNicotineUser: isNicotineUser ? "true" : "false",
          hasHealthIssues: hasHealthIssues ? "true" : "false",
          birthdate: `${birthdate.month}/${birthdate.day}/${birthdate.year}`
        })
    
        setQueryParams(searchParams.toString())
      },
    });

    const user = await analytics.user();
    analytics.track("quoteRequested", data);

    createLead(
      {
        ...data,
        anonymousId: user.anonymousId() as string,
      },
      {
        onSuccess: (res) => console.log(res, "CREATED LEAD"),
        onError: (res) => console.warn(res.message),
      }
    );
  };

  const handleErrors: SubmitErrorHandler<z.infer<typeof QuickQuoteSchema>> = (
    errors,
    e
  ) => {
    console.log(errors, e);
  };

  return (
    <div className="container p-4 mx-auto md:p-0">
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex-1 max-w-screen-md text-slate-500">
          <h1 className="text-3xl font-bold text-sky-900" id="quoteForm">
            Get your free instant quote now
          </h1>
          <form
            className="flex-1"
            ref={requestQuoteForm}
            onSubmit={handleSubmit(handleValidSubmit, handleErrors)}
          >
            {/* Coverage & Term Fields */}
            <div className="flex flex-1 gap-4 flex-nowrap">
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="coverage">
                  <span className="uppercase label-text">Coverage Amount</span>
                </label>
                <select
                  id="coverage"
                  className="select w-full bg-slate-200 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400"
                  {...register("coverage")}
                  onChange={(e) => setCoverage(parseInt(e.target.value))}
                >
                  <option value={0}>Select...</option>

                  {CoverageAmountSchema.options.map((option) => (
                    <option value={option.value} key={option.value}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(option.value)}
                    </option>
                  ))}
                </select>
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.coverage && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.coverage.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="term">
                  <span className="uppercase label-text">Term Length</span>
                </label>
                <select
                  id="term"
                  className="select w-full bg-slate-200 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400"
                  {...register("term")}
                  onChange={(e) =>
                    setTerm(parseInt(e.target.value.replace("T", "")))
                  }
                >
                  <option value={0}>Select...</option>
                  {TermOptionsSchema.items.map(({ shape }) => (
                    <option value={shape.value.value} key={shape.value.value}>
                      {shape.label.value}
                    </option>
                  ))}
                </select>
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.term && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.term.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            {/* Birthdate & Gender Fields */}
            <div className="flex flex-col flex-1 md:flex-row md:gap-4 flex-nowrap">
              <div className="flex-1 form-control">
                <label className="pb-0 label">
                  <span className="uppercase label-text">Birthdate</span>
                </label>
                <div className="flex flex-1 join">
                  <select
                    className={`join-item select w-full flex-auto bg-slate-200 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400${
                      errors?.birthdate &&
                      `border-2 border-solid border-red-500`
                    }`}
                    {...register("birthdate.month")}
                  >
                    {months.map((month, index) => (
                      <option
                        value={index.toString().padStart(2, "0")}
                        key={index}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    maxLength={2}
                    minLength={2}
                    placeholder="Day"
                    className={`input-bordered join-item input w-full flex-auto rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                      errors?.birthdate &&
                      `border-2 border-red-500 focus:outline-red-500`
                    }`}
                    {...register("birthdate.day")}
                  />
                  <input
                    type="text"
                    maxLength={4}
                    minLength={4}
                    placeholder="Year"
                    className={`input-bordered join-item input w-full flex-auto rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                      errors?.birthdate &&
                      `border-2 border-red-500 focus:outline-red-500`
                    }`}
                    {...register("birthdate.year")}
                  />
                </div>
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.birthdate && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.birthdate.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="gender">
                  <span className="uppercase label-text">Gender</span>
                </label>
                <select
                  id="gender"
                  className="select w-full bg-slate-200 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400"
                  {...register("gender")}
                >
                  <option value={""}>Select...</option>
                  {Object.keys(GenderSchema.Values).map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.gender && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.gender.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            {/* First/Last Name Fields */}
            <div className="flex flex-1 gap-4 flex-nowrap">
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="firstName">
                  <span className="uppercase label-text">First Name</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`input-bordered input w-full rounded-md bg-slate-200 autofill:text-red-500 p-4 au text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                    errors?.firstName &&
                    `border-2 border-red-500 focus:outline-red-500`
                  }`}
                  {...register("firstName")}
                />
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.firstName && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.firstName.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="lastName">
                  <span className="uppercase label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`input-bordered input w-full rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                    errors?.lastName &&
                    `border-2 border-red-500 focus:outline-red-500`
                  }`}
                  {...register("lastName")}
                />
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.lastName && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.lastName.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            {/* Email, Phone, and Zip Fields */}
            <div className="flex flex-col flex-1 md:flex-row md:gap-4 flex-nowrap">
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="email">
                  <span className="uppercase label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className={`input-bordered input w-full rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                    errors?.email &&
                    `border-2 border-red-500 focus:outline-red-500`
                  }`}
                  {...register("email")}
                />
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.email && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="phone">
                  <span className="uppercase label-text">Phone</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  className={`input-bordered input w-full rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                    errors?.phone &&
                    `border-2 border-red-500 focus:outline-red-500`
                  }`}
                  {...register("phone")}
                />
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.phone && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.phone.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex-1 form-control">
                <label className="pb-0 label" htmlFor="zip">
                  <span className="uppercase label-text">Zip</span>
                </label>
                <input
                  id="zip"
                  type="text"
                  className={`input-bordered input w-full rounded-md bg-slate-200 p-4 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400 ${
                    errors?.postalCode &&
                    `border-2 border-red-500 focus:outline-red-500`
                  }`}
                  {...register("postalCode")}
                />
                <label className="h-4 pt-1 pb-0 label">
                  {errors?.postalCode && (
                    <span className="text-red-500 label-text-alt">
                      {errors?.postalCode.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-col flex-1 mt-4 flex-nowrap">
              <div className="flex items-center space-x-2">
                <div className="join">
                  <input
                    type="radio"
                    aria-label="Yes"
                    value="1"
                    {...register("isNicotineUser")}
                    className="join-item btn border-slate-200 bg-slate-200 text-slate-600 checked:!border-sky-950 checked:!bg-sky-950 hover:border-sky-200 hover:bg-sky-200"
                  />
                  <input
                    type="radio"
                    aria-label="No"
                    value="0"
                    {...register("isNicotineUser")}
                    className="join-item btn border-slate-200 bg-slate-200 text-slate-600 checked:!border-sky-950 checked:!bg-sky-950 hover:border-sky-200 hover:bg-sky-200"
                  />
                </div>
                <label htmlFor="isNicotineUser" className="text-sm max-w-prose">
                  In the last 5 years, have you used any type of marijuana or
                  tobacco products?
                </label>
              </div>
              <label className="h-4 pt-1 pb-0 label">
                {errors?.isNicotineUser && (
                  <span className="text-red-500 label-text-alt">
                    {errors?.isNicotineUser.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex flex-col flex-1 mt-4 flex-nowrap">
              <div className="flex items-center space-x-2">
                <div className="join">
                  <input
                    type="radio"
                    aria-label="Yes"
                    value="1"
                    {...register("hasHealthIssues")}
                    className="join-item btn border-slate-200 bg-slate-200 text-slate-600 checked:!border-sky-950 checked:!bg-sky-950 hover:border-sky-200 hover:bg-sky-200"
                  />
                  <input
                    type="radio"
                    aria-label="No"
                    value="0"
                    {...register("hasHealthIssues")}
                    className="join-item btn border-slate-200 bg-slate-200 text-slate-600 checked:!border-sky-950 checked:!bg-sky-950 hover:border-sky-200 hover:bg-sky-200"
                  />
                </div>
                <label
                  htmlFor="hasHealthIssues"
                  className="text-sm max-w-prose"
                >
                  Have you, or anyone in your family, ever been diagnosed with
                  or sought treatment for cancer, cardiovascular (heart)
                  disease, diabetes, or mental health issues (including
                  depression and anxiety)?
                </label>
              </div>
              <label className="h-4 pt-1 pb-0 label">
                {errors?.hasHealthIssues && (
                  <span className="text-red-500 label-text-alt">
                    {errors?.hasHealthIssues.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex items-center justify-center col-span-2 col-start-4 py-4">
              <button
                type="submit"
                className="w-full max-w-md p-4 text-white rounded-md bg-sky-950"
              >
                Get Quote
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 pt-6 md:max-w-md gap-2 flex flex-col">
          <div className="px-8 py-8 text-white rounded-br-3xl rounded-tl-3xl bg-sky-700">
            <h2 className="text-3xl font-semibold text-center">Policy Price</h2>
            <div className="flex flex-col items-center py-6">
              {isLoading && (
                <span className="w-20 text-yellow-400 loading loading-spinner"></span>
              )}
              {!isLoading && (
                <>
                  <div>
                    <span className="mr-2 uppercase">from</span>
                    <span className="text-6xl font-bold tracking-tight text-yellow-400">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(quote[0])}
                    </span>
                  </div>
                  <div className="text-xl">
                    <span>to</span>
                    <span className="px-2 font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(quote[quote.length - 1])}
                    </span>
                    <span>per month</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center justify-center flex-1 p-4 bg-opacity-50 rounded-bl-3xl rounded-tr-3xl bg-sky-500">
                <span className="text-3xl">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(Number(coverage))}
                </span>
                <span className="font-bold uppercase">Coverage</span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 p-4 bg-opacity-50 rounded-br-3xl rounded-tl-3xl bg-sky-500">
                <span className="text-3xl">{term}</span>
                <span className="font-bold uppercase">Years</span>
              </div>
            </div>
          </div>
          { queryParams ? <a href={`https://apply.sbli.com/prescreen/needs?${queryParams}`} target="_blank" className="btn bg-yellow-400 border-yellow-500 hover:border-yellow-600 text-yellow-800 w-full hover:bg-yellow-500 ">Start Your Application</a> : null} 
          <div className="p-4 text-center">
            <h4 className="text-2xl font-bold">Questions?</h4>
            <div>
              Call us at <a href={`tel:${ phoneNumber }`}>{ phoneNumber }</a>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
