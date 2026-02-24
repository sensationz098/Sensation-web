"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
});

export default function StudentDetailForm() {
  const brandColor = "#DC8916";
  const { user } = useAuth();

  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const [countryDetails, setCountryDetails] = useState<any[]>([]);
  const [selectedDialCode, setSelectedDialCode] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("");
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.displayName ?? "",
      email: user?.email ?? "",
      gender: "",
      phone: "",
      dob: "",
      country: "",
      state: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesRes, detailsRes] = await Promise.all([
          fetch("https://countriesnow.space/api/v0.1/countries/states"),
          fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags"),
        ]);

        const statesData = await statesRes.json();
        const detailsData = await detailsRes.json();

        setAllCountries(statesData.data);
        setCountryDetails(detailsData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const onCountryChange = (countryName: string) => {
    form.setValue("country", countryName);
    form.setValue("state", ""); // Reset state on country change

    const countryObj = allCountries.find((c) => c.name === countryName);
    setAvailableStates(countryObj ? countryObj.states : []);

    const detailObj = countryDetails.find(
      (c) => c.name.common.toLowerCase() === countryName.toLowerCase(),
    );

    if (detailObj && detailObj.idd) {
      const code =
        detailObj.idd.root +
        (detailObj.idd.suffixes ? detailObj.idd.suffixes[0] : "");
      setSelectedDialCode(code);
      setSelectedFlag(detailObj.flags.svg || detailObj.flags.png);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Final Submission:", { ...values, dialCode: selectedDialCode });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Personalize your experience at Sensationz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className="focus-visible:ring-[#DC8916]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="focus-visible:ring-[#DC8916]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#DC8916]">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Number with Flag/Code */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <div className="flex rounded-md border border-input focus-within:ring-2 focus-within:ring-[#DC8916] overflow-hidden bg-white">
                        <div className="flex items-center gap-2 px-3 bg-slate-50 border-r text-sm text-slate-600 min-w-[100px] justify-center">
                          {selectedFlag && (
                            <img
                              src={selectedFlag}
                              alt="flag"
                              className="w-5 h-3 object-cover rounded-sm"
                            />
                          )}
                          <span className="font-medium">
                            {selectedDialCode || "+00"}
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="00000 00000"
                            className="border-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-1">
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="focus-visible:ring-[#DC8916]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Selection */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={onCountryChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#DC8916]">
                            <SelectValue
                              placeholder={
                                loading ? "Loading..." : "Select Country"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allCountries.map((country) => (
                            <SelectItem key={country.iso3} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* State Selection */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !form.watch("country") || availableStates.length === 0
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#DC8916]">
                            <SelectValue
                              placeholder={
                                !form.watch("country")
                                  ? "Pick country first"
                                  : "Select State"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableStates.map((state) => (
                            <SelectItem key={state.name} value={state.name}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold"
                style={{ backgroundColor: brandColor }}
              >
                Save Profile Details
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
