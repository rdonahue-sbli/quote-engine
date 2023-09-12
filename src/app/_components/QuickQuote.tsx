"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
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

export default function QuickQuote() {
  const { analytics } = useAnalytics();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    control,
  } = useForm<z.infer<typeof QuickQuoteSchema>>({
    mode: "onBlur",
    resolver: zodResolver(QuickQuoteSchema),
  });

  const [quote, setQuote] = useState([0]);
  const [coverage, setCoverage] = useState(0);
  const [term, setTerm] = useState(0);
  const { mutate, error, data } = trpc.rates.getRate.useMutation({
    onSuccess: (quote) => {
      setQuote(quote);
    },
  });

  const handleValidSubmit: SubmitHandler<
    z.infer<typeof QuickQuoteSchema>
  > = async (data, e) => {
    mutate(data);

    // try {
    //   const rate = await fetch(`api/rate`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setQuote(data));
    //   const user = await analytics.user();

    //   // Lookup postal code location
    //   const cityStateRespone = await fetch(
    //     `api/locations/city-state/${data.postalCode}`
    //   );
    //   const cityStateJson = await cityStateRespone.json();

    //   const cityState = CityStateResultSchema.safeParse(cityStateJson);
    //   if (!cityState.success) throw new Error(cityStateJson);

    //   // Create Lead
    //   fetch("api/tap/leads", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       city: cityState.data.City,
    //       state: cityState.data.State,
    //       anonymousId: user.anonymousId(),
    //       ...data,
    //     }),
    //   });
    // } catch (e) {
    //   // TODO: Notify user of invalid zip
    //   console.error(CityStateErrorSchema.parse(e).Error);
    // }
  };

  const handleErrors: SubmitErrorHandler<z.infer<typeof QuickQuoteSchema>> = (
    errors,
    e
  ) => {
    console.log(errors, e);
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex-1 p-4 text-gray-500 bg-white rounded-bl-3xl rounded-tr-3xl">
        <h1 className="text-3xl font-bold text-sky-900">
          Protect your family with Term Life insurance
        </h1>
        <form
          className="flex-1"
          onSubmit={handleSubmit(handleValidSubmit, handleErrors)}
        >
          {/* Coverage & Term Fields */}
          <div className="flex flex-1 space-x-4 flex-nowrap">
            <div className="flex-1 form-control">
              <label className="pb-0 label" htmlFor="Coverage">
                <span className="text-lg font-medium label-text text-sky-500">
                  Coverage Amount
                </span>
              </label>
              <select
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
              <label className="pb-0 label" htmlFor="Term">
                <span className="text-lg font-medium label-text text-sky-500">
                  Term Length
                </span>
              </label>
              <select
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
          <div className="flex flex-1 space-x-4 flex-nowrap">
            <div className="flex-1 form-control">
              <label className="pb-0 label" htmlFor="birthdate">
                <span className="text-lg font-medium label-text text-sky-500">
                  Birthdate
                </span>
              </label>
              <div className="flex flex-1 join">
                <select
                  className={`join-item select w-full flex-auto bg-slate-200 text-slate-600 focus:outline-offset-[-1px] focus:outline-sky-400${
                    errors?.birthdate && `border-2 border-solid border-red-500`
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
              <label className="pb-0 label" htmlFor="Gender">
                <span className="text-lg font-medium label-text text-sky-500">
                  Gender
                </span>
              </label>
              <select
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
          <div className="flex flex-1 space-x-4 flex-nowrap">
            <div className="flex-1 form-control">
              <label className="pb-0 label" htmlFor="firstName">
                <span className="text-lg font-medium label-text text-sky-500">
                  First Name
                </span>
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
                <span className="text-lg font-medium label-text text-sky-500">
                  Last Name
                </span>
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
          <div className="flex flex-1 space-x-4 flex-nowrap">
            <div className="flex-1 form-control">
              <label className="pb-0 label" htmlFor="email">
                <span className="text-lg font-medium label-text text-sky-500">
                  Email
                </span>
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
                <span className="text-lg font-medium label-text text-sky-500">
                  Phone
                </span>
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
                <span className="text-lg font-medium label-text text-sky-500">
                  Zip
                </span>
              </label>
              <input
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
              <label htmlFor="NicotineUse">
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
              <label htmlFor="NicotineUse">
                Have you, or anyone in your family, ever been diagnosed with or
                sought treatment for cancer, cardiovascular (heart) disease,
                diabetes, or mental health issues (including depression and
                anxiety)?
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
          <div className="flex items-end justify-end col-span-2 col-start-4 py-4">
            <button
              type="submit"
              className="self-end w-full p-4 text-white rounded-md bg-sky-950"
            >
              Get Quote
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 md:max-w-md">
        <div className="px-8 py-8 text-white rounded-br-3xl rounded-tl-3xl bg-sky-700">
          <h2 className="text-3xl font-semibold text-center">Policy Price</h2>
          <div className="flex flex-col items-center py-6">
            {isSubmitting && (
              <span className="w-20 text-yellow-400 loading loading-spinner"></span>
            )}
            {!isSubmitting && (
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
        <div className="p-4 text-center">
          <h4 className="text-2xl font-bold">Questions?</h4>
          <div>
            Call us at <a href="tel:888-630-5000">888-630-5000</a>
          </div>
        </div>
      </div>
    </div>
  );
}
