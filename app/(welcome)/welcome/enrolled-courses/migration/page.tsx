"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import handleMigration from "@/lib/migration/handleMigration";
import { boolean } from "zod";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useCourseStore } from "@/store/useCourseStore";
import { useRouter } from "next/navigation";

const MigrationPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { migrationCourse, setMigrationCourse } = useCourseStore();
  const router = useRouter();
  if (!user) return <div>No user found</div>;

  const initials =
    user?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";
  useEffect(() => {
    if (migrationCourse) {
      //   console.log("Migration Course updated:", migrationCourse);
      router.push("/welcome/enrolled-courses/migration/details");
    } else {
      console.error("NOT FOUND!!");
    }
  }, [migrationCourse]);
  const handleMigrationLogic = async () => {
    setLoading(true);
    const response = await handleMigration(user.email || "");
    if (!response.success) {
      setError(response.error || "");
      return;
    }
    setMigrationCourse(response.course);
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback className="text-xl bg-slate-100 text-slate-600">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Account Migration
          </CardTitle>
          <CardDescription>
            Logged in as{" "}
            <span className="font-medium text-slate-900">{user?.email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              Confirming migration will sync your previous course progress and
              certificates to your new profile. This action cannot be undone.
            </p>
          </div>

          <div className="text-sm text-slate-500 text-center">
            User ID:{" "}
            <code className="bg-slate-100 px-1 rounded text-xs">
              {user?.uid?.slice(0, 8)}...
            </code>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {loading ? (
            <>
              <Button
                onClick={handleMigrationLogic}
                className="w-full py-6 text-lg font-semibold"
                size="lg"
              >
                <Spinner className="mr-2 h-5 w-5 animate-spin" />
                Migrating...
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleMigrationLogic}
                className="w-full py-6 text-lg font-semibold"
                size="lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Confirm Migration
              </Button>
            </>
          )}
          <Link href={"/welcome"}>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-slate-600"
            >
              Cancel and Go Back
            </Button>
          </Link>

          {error ? (
            <div className="w-full p-6 bg-red-50 border border-red-200 rounded-xl space-y-4">
              <div className="flex items-center gap-3 text-red-600 font-semibold">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>

              <div className="pt-2">
                <Link href={"/welcome"}>
                  <Button variant="destructive" className="w-full font-bold">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MigrationPage;
