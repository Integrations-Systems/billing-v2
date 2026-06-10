'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormLogin() {
  return (
    <>
        <h1>Login</h1>
        <form>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" name="password" required />
            <Button type="submit">Login</Button>
        </form>
    </>
  );
}