import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, { message: "نام باید حداقل ۳ کاراکتر باشد" }),
  email: z.string().email({ message: "لطفاً یک آدرس ایمیل معتبر وارد کنید" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "لطفاً ایمیل معتبر وارد کنید" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل 6  صحیح نیست" }),
});