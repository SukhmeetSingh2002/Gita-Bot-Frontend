import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";

import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const callbackPort = router.query.callbackPort;
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [alertDisplay, setAlertDisplay] = useState({
    open: false,
    message: "",
  });

  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const fetchToServer = async (url, body, user) => {
      return true;
    // try {
    //   const database = getDatabase();
    //   // Fetch the username from the Realtime Database
    //   const usernameSnapshot = await get(
    //     child(ref(database), `users/${user.uid}/name`)
    //   );

    //   const username = usernameSnapshot.val();

    //   // Redirect to the dashboard if the username is not set
    //   if (!username) {
    //     router.push("/dashboard");
    //     throw new Error("Username not set");
    //   }

    //   // Perform the fetch request
    //   const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   console.log(res);

    //   if (res.status === 200) {
    //     return true;
    //   } else {
    //     throw new Error("Something went wrong");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  };

  const signInWithGoogle = async () => {
    // try {
    //   const result = await signInWithPopup(auth, provider);
    //   console.log(result);
    //   const user = result.user;

    //   const url = `http://localhost:${callbackPort}/auth/user`;
    //   const body = {
    //     user,
    //   };

    //   if (callbackPort !== "0000" && callbackPort !== undefined && callbackPort !== null) {
    //     await fetchToServer(url, body, user);
    //     router.push(`/auth/success`);
    //   } else {
    //     router.push(`/dashboard`);
    //   }

    // } catch (error) {
    //   console.log(error);
    //   setAlertDisplay({
    //     open: true,
    //     message: error.message,
    //   });
    // }
    return true;
  };

  const signInWithUserAndPassword = async () => {
    console.log(user);
    setIsLoading(true);
    const email = user.email;
    const password = user.password;
    // const name = user.name;

    if (!email || !password) {
      setAlertDisplay({
        open: true,
        message: "Please fill all the fields",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // check if email is verified, if not, send verification email
      if (!user.emailVerified) {
        console.log("email not verified");
        await sendEmailVerification(user);
        setAlertDisplay({
          open: true,
          message:
            "Please verify your email, check your inbox. And then you can continue.",
        });

        // wait for user to verify email
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      const url = `http://localhost:${callbackPort}/auth/user`;
      const body = {
        user,
      };

      if (callbackPort !== "0000" && callbackPort !== undefined && callbackPort !== null) {
        await fetchToServer(url, body, user);
        router.push(`/auth/success`);
      } else {
        router.push(`/dashboard`);
      }

    } catch (error) {
      console.log(error);

      setAlertDisplay({
        open: true,
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }

  };

  // if (callbackPort === undefined) {
  //   // show invalid url page
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-[#EFF6FF]">
  //       <Card color="transparent" shadow={false}>
  //         <Typography variant="h4" color="blue-gray">
  //           Invalid URL
  //         </Typography>
  //         <Typography color="gray" className="mt-1 font-normal">
  //           The URL you are trying to access is invalid.
  //         </Typography>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    // center the card
    <div className="bg-[#EFF6FF] p-1">
      <Alert
        color="red"
        variant="gradient"
        open={alertDisplay.open}
        onClose={() => setAlertDisplay({ open: false, message: "" })}
      >
        <span>{alertDisplay.message}</span>
      </Alert>
      <div className="flex items-center justify-center h-screen bg-[#EFF6FF]">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Fill up the form below to continue.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              {/* <Input
                size="lg"
                label="Name"
                spellCheck={true}
                onChange={handleChanges}
                name="name"
              /> */}
              <Input
                size="lg"
                label="Email"
                spellCheck={true}
                onChange={handleChanges}
                name="email"
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                onChange={handleChanges}
                name="password"
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              className="mt-6 flex items-center justify-center"
              fullWidth
              shadow="none"
              color="blue"
              disabled={isLoading}
              onClick={signInWithUserAndPassword}
            >
              Sign In
              {isLoading && (
                <Spinner
                  className="ml-2"
                  color="white"
                  size="sm"
                  stroke={2}
                />
              )}
            </Button>

            {/* now we need to add continue with google button below this */}
            {/* and also a divider */}
            <div className="flex items-center justify-center mt-6">
              <div className="w-36 h-px bg-gray-300"></div>
              <Typography color="gray" className="mx-4">
                Or
              </Typography>
              <div className="w-36 h-px bg-gray-300"></div>
            </div>

            <Button
              size="lg"
              variant="outlined"
              fullWidth
              color="blue-gray"
              className="flex items-center gap-3 justify-center mt-6"
              onClick={signInWithGoogle}
            >
              <img src="/google.png" alt="metamask" className="h-6 w-6" />
              Continue with Google
            </Button>

            <Typography color="gray" className="mt-6 text-center font-normal">
              By registering, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Privacy Policy
              </a>
              .
            </Typography>

            <Typography color="gray" className="mt-4 text-center font-normal">
              {"Don't have an account? "}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
