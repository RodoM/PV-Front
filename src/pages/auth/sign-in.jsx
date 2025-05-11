import { SignInForm } from "@/components/auth/sign-in-form";

function SignIn() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
