import { useState } from "react";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar";
import { Dialog, DialogTitle } from "@mui/material";
import SignUP from "../components/Home/Form/SignUp";

interface DialogProps {
  open: boolean;
  onClose: (value: any) => void;
}

function SignUPDiaglog(props: DialogProps) {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>SignUP/SignIn</DialogTitle>
      <SignUP />
    </Dialog>
  );
}

const Home: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  console.log(open);
  return (
    <main>
      <Navbar />
      <Hero open={open} setOpen={setOpen} />
      <SignUPDiaglog open={open} onClose={() => setOpen(false)} />
    </main>
  );
};

export default Home;
