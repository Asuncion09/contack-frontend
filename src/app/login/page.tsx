"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // en caso de fallas envia los mensajes de errores
    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/contack");
  };

  return (
    <div className="h-screen items-center w-screen justify-center flex">
      <div className="h-[60%] mt-[-60px] w-2/5 grid shadow-xl rounded-xl">
        <form onSubmit={handleSubmit}>

          <div className="grid col-auto px-auto py-3 bg-[#d6acff] rounded-t-xl text-xl font-semibold text-[#282a36] text-center">
            <h1>Login</h1>
          </div>

          <div className="grid col-auto">
            <label >Email:</label>
            <input
              type="email"
              placeholder="test@test.com"
              name="email"
              className="form-control mb-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="grid col-auto">
            <label >Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control mb-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg bg-[#69ff94]"
          >
            Login
          </button>
        </form>

        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};
export default LoginPage;
