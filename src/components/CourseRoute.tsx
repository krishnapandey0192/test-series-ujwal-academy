import React from "react";
import { useParams } from "react-router-dom";
import CoursePage from "./CoursePage";
import courses from "../data/coursesData";

const CourseRoute: React.FC = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-gray-600 mt-2">
            We couldn't find the course you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return <CoursePage course={course} />;
};

export default CourseRoute;
