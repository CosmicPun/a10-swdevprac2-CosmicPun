import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import DateReserve from "@/components/DateReserve";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  let profile = null;

  if (session?.user?.token) {
    profile = await getUserProfile(session.user.token);
  }

  return (
    <main className="min-h-screen p-5 md:p-10 mt-6 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">Venue Booking</h2>
        
        {profile && (
          <div className="mb-8 p-5 bg-cyan-50 border border-cyan-100 rounded-xl text-gray-700 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-cyan-800">Your Booking Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <p><span className="font-semibold text-gray-800">Name:</span> {profile.data.name}</p>
              <p><span className="font-semibold text-gray-800">Email:</span> {profile.data.email}</p>
              <p><span className="font-semibold text-gray-800">Tel.:</span> {profile.data.tel}</p>
              <p><span className="font-semibold text-gray-800">Member Since:</span> {new Date(profile.data.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        
        <form className="flex flex-col gap-6">
          <TextField
            name="Name-Lastname"
            label="Name-Lastname"
            variant="standard"
            fullWidth
          />

          <TextField
            name="Contact-Number"
            label="Contact-Number"
            variant="standard"
            fullWidth
          />

          <Select id="venue" defaultValue="Bloom" fullWidth>
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>

          <DateReserve />

          <Button 
            variant="contained"
            className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-200"
            name="Book Venue"
          >
            Book Venue
          </Button>
        </form>
      </div>
    </main>
  );
}