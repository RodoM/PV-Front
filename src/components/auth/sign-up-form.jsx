import { useRef, useState } from "react";
import { toast } from "sonner";
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

  const handleNext = async () => {
    if (currentStep === 1) {
      const data = await step1Ref.current?.validate();
      if (!data) return;

      setFormData((prev) => ({ ...prev, step1: data }));
      setCurrentStep((prev) => prev + 1);
    }

    if (currentStep === 2) {
      const data = await step2Ref.current?.validate();
      if (!data) return;

      try {
        // Persist immediately-validated data without relying on async state.
        await api.post("/auth/register", formData.step1);
        toast.success("Cuenta creada exitosamente");
        await api.post("/negocio/register", data);
        toast.success("Negocio creado exitosamente");
        setCurrentStep((prev) => prev + 1);
        setFormData((prev) => ({ ...prev, step2: data }));
      } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error en el proceso de registro");
      }
    }
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
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                className="w-32"
                onClick={handleNext}
                disabled={currentStep > steps.length}
              >
                Siguiente
              </Button>
            </div>

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
