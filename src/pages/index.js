import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";



import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const [alertDisplay, setAlertDisplay] = useState({
    open: false,
    message: "",
  });
  const [successAlert, setSuccessAlert] = useState({
    open: true,
    message: "Enter your query to search",
  });

  const handleChanges = (e) => {
    // console.log(user, e.target.name, e.target.value);
    setQuery(e.target.value);
  };

  const handleBotResponse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertDisplay({ open: true, message: "Bot can take some time to respond as it is hosted on free server" });
    const url = `https://bhagwatgitabot.azurewebsites.net/api/hello`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ "user_input": query }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (res.status === 200) {
      setBotResponse(data.message);
      setSuccessAlert({ open: true, message: data.message });
    } else {
      setAlertDisplay({ open: true, message: data.message });
    }
  }

  
  


  return (
    <div className="bg-[#EFF6FF] p-1">
      <Alert
        color="red"
        variant="gradient"
        open={alertDisplay.open}
        onClose={() => setAlertDisplay({ open: false, message: "" })}
      >
        <span>{alertDisplay.message}</span>
      </Alert>

      {/* Succes alert */}
      <Alert
        color="green"
        variant="gradient"
        open={successAlert.open}
        onClose={() => setSuccessAlert({ open: false, message: "" })}
      >
        <span>{successAlert.message}</span>
      </Alert>

      <div className="flex items-center justify-center h-screen bg-[#EFF6FF]">
        <Card color="transparent" shadow={false} >
          <Typography variant="h4" color="blue-gray">
            Get Motivated
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your query to and response from Gita Bot will be displayed here
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Query"
                spellCheck={true}
                onChange={handleChanges}
                value={query}
                name="name"
                // disabled={true}
              />
              <Input
                size="lg"
                label="Response"
                spellCheck={true}
                value={botResponse}
                onChange={handleChanges}
                name="email"
                disabled
              />
            </div>
            <Button
              className="mt-6 flex items-center justify-center"
              fullWidth
              shadow="none"
              color="green"
              onClick={handleBotResponse}
              disabled={isLoading}
            >
              Get Response
              {isLoading && (
                <Spinner
                  className="ml-2"
                  color="white"
                  size="sm"
                  stroke={2}
                />
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
