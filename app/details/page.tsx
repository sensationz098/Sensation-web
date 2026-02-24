"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
// Types for the API response
interface State {
  name: string;
  state_code: string;
}
interface CountryData {
  name: string;
  iso3: string;
  states: State[];
}
export default function StudentDetailForm() {
  const brandColor = "#DC8916";
  const [date, setDate] = React.useState<Date>();
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [availableStates, setAvailableStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((res) => {
        setAllCountries(res.data);
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName);
    const countryObj = allCountries.find((c) => c.name === countryName);
    setAvailableStates(countryObj ? countryObj.states : []);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Please provide your details to personalize your learning experience
            at Sensationz.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="focus-visible:ring-[#DC8916]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="focus-visible:ring-[#DC8916]"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger className="focus:ring-[#DC8916]">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="focus-visible:ring-[#DC8916]"
                />
              </div>

              {/* Date of Birth (Calendar) */}
              <div className="space-y-2 flex flex-col">
                <Label className="mb-1">Date of Birth</Label>
                <Popover>
                  <Input
                    id="dob"
                    type="date"
                    className="focus-visible:ring-[#DC8916] block"
                    onChange={(e) => setDate(new Date(e.target.value))}
                  />
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <Select onValueChange={handleCountryChange} disabled={loading}>
                  <SelectTrigger className="focus:ring-[#DC8916]">
                    <SelectValue
                      placeholder={loading ? "Loading..." : "Select Country"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {allCountries.map((country) => (
                      <SelectItem key={country.iso3} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Select
                  disabled={!selectedCountry || availableStates.length === 0}
                >
                  <SelectTrigger className="focus:ring-[#DC8916]">
                    <SelectValue
                      placeholder={
                        !selectedCountry
                          ? "Select country first"
                          : "Select State"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full py-6 text-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: brandColor }}
            >
              Save Profile Details
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
