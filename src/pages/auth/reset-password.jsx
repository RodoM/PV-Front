import { ResetPasswordForm } from "@/components/auth/reset-password-form";

function ResetPassword() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPassword;
