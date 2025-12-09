"use client";

import { Formik, Form } from "formik";
import { MapPin, Calendar, CloudDownload } from "lucide-react";
import { weatherSchema } from "@/lib/validation";
import Button from "@/app/components/UI/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/app/components/UI/Card";
import toast from "react-hot-toast";

export default function InputPanel({ onFetchData, isLoading }) {
  const initialValues = {
    latitude: "",
    longitude: "",
    start_date: "",
    end_date: "",
  };

  const today = new Date().toISOString().split("T")[0];
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        start_date: values.start_date.split("T")[0],
        end_date: values.end_date.split("T")[0],
      };
      await onFetchData(formattedValues);
      toast.success("Weather data fetched and stored successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to fetch weather data");
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudDownload className="h-6 w-6 text-primary" />
          Fetch Weather Data
        </CardTitle>
        <CardDescription>
          Enter location coordinates and date range (max 31 days) to fetch
          historical weather data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={weatherSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Latitude Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4" />
                      Latitude
                    </div>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={values.latitude}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g., 40.7128"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                  {errors.latitude && touched.latitude && (
                    <p className="text-sm text-destructive text-red-500">
                      {errors.latitude}
                    </p>
                  )}
                </div>

                {/* Longitude Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4" />
                      Longitude
                    </div>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={values.longitude}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g., -74.0060"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                  {errors.longitude && touched.longitude && (
                    <p className="text-sm text-destructive text-red-500">
                      {errors.longitude}
                    </p>
                  )}
                </div>

                {/* Start Date Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </div>
                    <input
                      type="date"
                      name="start_date"
                      value={values.start_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                       max={today}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                  {errors.start_date && touched.start_date && (
                    <p className="text-sm text-destructive text-red-500">
                      {errors.start_date}
                    </p>
                  )}
                </div>

                {/* End Date Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </div>
                    <input
                      type="date"
                      name="end_date"
                      value={values.end_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={values.start_date ? values.start_date : undefined}
                      max={today}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                  {errors.end_date && touched.end_date && (
                    <p className="text-sm text-destructive text-red-500">
                      {errors.end_date}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full md:w-auto bg-blue-200 hover:from-primary/90 hover:to-blue-600/90"
                >
                  <CloudDownload className="mr-2 h-4 w-4" />
                  Fetch & Store Data
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
