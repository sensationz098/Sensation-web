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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Loader2, User, MapPin, Phone } from "lucide-react";
import { BASE_URL } from "@/config/api";
import getProfileId from "@/lib/user/getProfileId";

// Schema stays the same for consistency
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  phone: z
    .string()
    .trim()
    .min(8, "Contact is too short")
    .max(16, "Contact exceeds limit")
    .regex(/^\+?[0-9]+$/, "Invalid contact format"),
  dob: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
  const brandColor = "#DC8916";
  const { user } = useAuth();
  const router = useRouter();

  // State Management
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const [countryDetails, setCountryDetails] = useState<any[]>([]);
  const [selectedDialCode, setSelectedDialCode] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("");

  if (!user) return <div>Not authenticated</div>;
  const form = useForm<ProfileFormValues>({
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

  // 1. Fetch Location Data & Existing Profile
  useEffect(() => {
    const initData = async () => {
      try {
        const [statesRes, detailsRes, profileRes] = await Promise.all([
          fetch("https://countriesnow.space/api/v0.1/countries/states"),
          fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags"),
          // Adjust this URL to your actual GET endpoint
          fetch(`http://localhost:5000/api/auth/profile/${user?.uid}`),
        ]);

        const statesData = await statesRes.json();
        const detailsData = await detailsRes.json();

        setAllCountries(statesData.data);
        setCountryDetails(detailsData);

        if (profileRes.ok) {
          const profile = await profileRes.json();
          // Populate form with existing data
          form.reset({
            fullName: profile.full_name || user?.displayName || "",
            email: profile.email || user?.email || "",
            gender: profile.gender || "",
            phone: profile.contact?.replace(/^\+\d+/, "") || "", // strip dial code for input
            dob: profile.date_of_birth || "",
            country: profile.country || "",
            state: profile.state || "",
          });

          // Trigger country/state logic for existing data
          if (profile.country) {
            handleCountryLogic(profile.country, statesData.data, detailsData);
          }
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) initData();
  }, [user, form]);

  // Logic to handle flag/code and states
  const handleCountryLogic = (
    countryName: string,
    countries: any[],
    details: any[],
  ) => {
    const countryObj = countries.find((c) => c.name === countryName);
    setAvailableStates(countryObj ? countryObj.states : []);

    const detailObj = details.find(
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

  const onCountryChange = (val: string) => {
    form.setValue("country", val);
    form.setValue("state", "");
    handleCountryLogic(val, allCountries, countryDetails);
  };

  async function onSubmit(values: ProfileFormValues) {
    setSubmitting(true);
    const fullPhoneNumber = `${selectedDialCode}${values.phone.replace(/\s+/g, "")}`;
    try {
      const id = await getProfileId(user?.uid || "");
      const response = await fetch(
        `${BASE_URL}/api/auth/update-profile/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            firebase_auth_id: user?.uid,
            avatar_url: user?.photoURL,
            email: user?.email,
            full_name: values.fullName,
            gender: values.gender,
            contact: fullPhoneNumber,
            date_of_birth: values.dob,
            state: values.state,
            country: values.country,
          }),
        },
      ).then((res) => res.json());
      if (response.status) {
        alert("Profile updated successfully!");
        router.push("/welcome/profile");
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#DC8916]" />
        <p className="mt-4 text-slate-500 font-medium">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 px-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Account Settings
            </h1>
            <p className="text-slate-500 text-sm">
              Update your personal information and preferences.
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-none">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* 1. Basic Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#DC8916] font-semibold border-b pb-2">
                    <User size={18} />
                    <span>Personal Details</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="bg-slate-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="bg-slate-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* 2. Address Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#DC8916] font-semibold border-b pb-2">
                    <MapPin size={18} />
                    <span>Location Information</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={onCountryChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {allCountries.map((c) => (
                                <SelectItem key={c.iso3} value={c.name}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={availableStates.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableStates.map((s) => (
                                <SelectItem key={s.name} value={s.name}>
                                  {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* 3. Contact Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#DC8916] font-semibold border-b pb-2">
                    <Phone size={18} />
                    <span>Contact Details</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="flex rounded-md border border-input focus-within:ring-2 focus-within:ring-[#DC8916] overflow-hidden">
                          <div className="flex items-center gap-2 px-3 bg-slate-100 border-r text-sm min-w-[90px]">
                            {selectedFlag && (
                              <img
                                src={selectedFlag}
                                alt="flag"
                                className="w-5 h-3"
                              />
                            )}
                            <span className="font-mono">
                              {selectedDialCode || "+00"}
                            </span>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="12345 67890"
                              className="border-none focus-visible:ring-0"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    type="submit"
                    className="flex-1 py-6 text-lg font-bold"
                    style={{ backgroundColor: brandColor }}
                    disabled={submitting}
                  >
                    {submitting ? "Saving Changes..." : "Update Profile"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="py-6 px-8"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
