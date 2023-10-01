import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

//   import succes icon from heroicons
// check-circle
import { CheckCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Example() {
  return (
    // center it
    <div className="bg-red-50 h-screen flex flex-col justify-center items-center">
      <Card className="mt-6 w-96 mx-auto">
        <CardBody>
          {/* show in red */}
          <ShieldExclamationIcon className="text-red-500 w-12 h-12 mb-4" />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Success
          </Typography>
          <Typography>
            You have successfully logged in to your account. Now you can close
            this window.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-red-500 hover:bg-gray-100 active:bg-gray-200"
            >
              Go Back
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
