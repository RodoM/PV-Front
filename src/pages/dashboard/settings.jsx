import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  email: z.string().email("Email inválido"),
  bio: z.string().optional(),
  urls: z.array(z.string().url("URL inválida")).optional(),
});

function UserProfileForm({ userData = {}, onSave }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userData.username || "",
      email: userData.email || "",
      bio: userData.bio || "",
      urls: userData.urls || ["", ""],
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Perfil actualizado correctamente");
      setLoading(false);
      onSave?.(data);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form className="space-y-6 max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Profile</h2>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("urls")?.map((_, index) => (
          <>
            <FormField
              key={index}
              name={`urls.${index}`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL #{index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mr-4"
              type="button"
              variant="destructive"
              onClick={() => {
                const urls = form.watch("urls") || [];
                const newUrls = urls.filter((_, i) => i !== index);
                form.setValue("urls", newUrls);
              }}
            >
              Delete URL
            </Button>
          </>
        ))}

        <div className="pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={(form.watch("urls")?.length || 0) >= 3} //validacion de maximo de add url
            onClick={() => form.setValue("urls", [...(form.watch("urls") || []), ""])}
          >
            Add URL
          </Button>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Update profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserProfileForm;
