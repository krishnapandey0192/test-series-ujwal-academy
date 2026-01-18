import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import TestSeries from "./components/TestSeries";
import TestSeriesCategory from "./components/TestSeriesCategory";
import TestSeriesTests from "./components/TestSeriesTests";
import Login from "./components/Login";
import Register from "./components/Register";

import TestExperience from "./components/TestExperience";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminTests from "./components/AdminTests";
import AdminAddTest from "./components/AdminAddTest";
import AdminCategoryTests from "./components/AdminCategoryTests";
import AdminCategories from "./components/AdminCategories";
import AdminSubcategories from "./components/AdminSubcategories";
import App from "./App";
import TestPage from "./pages/Test";
import Scoreboard from "./pages/Scoreboard";
import Leaderboard from "./components/Leaderboard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import RefundPolicy from "./components/RefundPolicy";
import StudentAnalysis from "./pages/StudentAnalysis";
import ResetPassword from "./components/ResetPassword";
import About from "./components/About";
import Courses from "./components/Courses";
import Contact from "./components/Contact";
import Admissions from "./components/Admissions";
import CourseRoute from "./components/CourseRoute";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";

const AppRouter = () => (
  <>
    <Toaster richColors position="top-center" />
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <App />
            </Layout>
          }
        />
        <Route
          path="/test-series"
          element={
            <Layout>
              <TestSeries />
            </Layout>
          }
        />
        <Route
          path="/test-series/category/:id"
          element={
            <Layout>
              <TestSeriesCategory />
            </Layout>
          }
        />
        <Route
          path="/test-series/category/:categoryId/subcategory/:subcategoryId"
          element={
            <Layout>
              <TestSeriesTests />
            </Layout>
          }
        />
        {/* <Route
        path="/test-series"
        element={
          <Layout>
            <TestSeries />
          </Layout>
        }
      /> */}
        <Route
          path="/student/test/view/:id"
          element={
            <Layout>
              <TestPage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Layout>
              <Leaderboard />
            </Layout>
          }
        />
        <Route
          path="/my-tests"
          element={
            <Layout>
              <TestExperience />
            </Layout>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="tests" element={<AdminTests />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="add-test" element={<AdminAddTest />} />
          <Route path="category/:categoryId" element={<AdminSubcategories />} />
          <Route
            path="category/:categoryId/:subcategoryId"
            element={<AdminCategoryTests />}
          />
          <Route path="test/view/:id" element={<TestPage />} />
          <Route path="student-analysis" element={<StudentAnalysis />} />
        </Route>
        {/* Add this route for scoreboard */}
        <Route
          path="/scoreboard"
          element={
            <Layout>
              <Scoreboard />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/courses/:slug"
          element={
            <Layout>
              <CourseRoute />
            </Layout>
          }
        />
        <Route
          path="/admissions"
          element={
            <Layout>
              <Admissions />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout>
              <Features />
            </Layout>
          }
        />
        <Route
          path="/success-stories"
          element={
            <Layout>
              <Testimonials />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <Layout>
              <TermsOfService />
            </Layout>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <Layout>
              <RefundPolicy />
            </Layout>
          }
        />
      </Routes>
    </Router>
  </>
);

export default AppRouter;
