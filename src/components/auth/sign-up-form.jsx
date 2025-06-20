import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import Step1 from "./steps/step-1";
import Step2 from "./steps/step-2";
import Step3 from "./steps/step-3";
import { Link } from "react-router-dom";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";

const steps = [
  {
    step: 1,
    title: "Crear cuenta",
  },
  {
    step: 2,
    title: "Crear negocio",
  },
  {
    step: 3,
    title: "Confirmación",
  },
];

export function SignUpForm() {
  const step1Ref = useRef();
  const step2Ref = useRef();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: null,
    step2: null,
    step3: null,
  });
  const { setToken, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.negocioId) setCurrentStep(2);
  }, [user]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const data = await step1Ref.current?.validate();
      if (!data) return;

      setLoading(true);
      try {
        await api.post("/auth/register", data);

        const response = await api.post("/auth/login", {
          email: data.email,
          password: data.password,
        });

        const { token } = response.data.data;
        setToken(token);
        setFormData((prev) => ({ ...prev, step1: data }));
        setCurrentStep((prev) => prev + 1);
        toast.success("Cuenta creada exitosamente");
      } catch (error) {
        let errorMessage = "Ocurrió un error al registrar el usuario";

        if (error.response?.data?.errors?.[0]) {
          const err = error.response.data.errors[0];
          if (err.includes("already taken")) {
            errorMessage = "Este email ya está registrado";
          }
        }

        toast.error(errorMessage);
      }
    }

    if (currentStep === 2) {
      const data = await step2Ref.current?.validate();
      if (!data) return;

      setLoading(true);
      try {
        await api.post("/business/register", data);
        toast.success("Negocio creado exitosamente");
        setFormData((prev) => ({ ...prev, step2: data }));
        setCurrentStep((prev) => prev + 1);
      } catch (error) {
        const { message } = error.response.data;
        toast.error(message);
      }
    }
    setLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Registrarse</CardTitle>
        <CardDescription>Complete los pasos para registrar su cuenta y negocio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {steps.map(({ step, title }) => (
            <StepperItem
              key={step}
              step={step}
              disabled={true}
              className="relative flex-1 flex-col!"
            >
              <StepperTrigger className="flex-col gap-3 rounded">
                <StepperIndicator />
                <div className="space-y-0.5 px-2">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          ))}
        </Stepper>

        <div className="my-10">
          {currentStep === 1 && <Step1 ref={step1Ref} defaultValues={formData.step1} />}
          {currentStep === 2 && <Step2 ref={step2Ref} defaultValues={formData.step2} />}
          {currentStep === 3 && <Step3 email={formData.step1.email} />}
        </div>

        {currentStep !== 3 && (
          <>
            <Button className="w-full" onClick={handleNext} disabled={loading}>
              {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
              Siguiente
            </Button>

            <div className="mt-4 text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link to="/iniciar-sesion" className="underline underline-offset-4">
                Iniciar sesión
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
