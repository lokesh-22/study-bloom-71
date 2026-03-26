import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

const Login = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect after successful sign in
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) navigate("/dashboard");
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignedOut>
          <div className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
            <SignIn path="/login" routing="path" />
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Login;