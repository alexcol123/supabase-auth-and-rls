import { UserAuth } from "../Context/AuthContext";

const Dashboard = () => {
  const {signOut, session } = UserAuth();
  console.log('session in dashboard')
  console.log(session)
  console.log('session in dashboard')

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Admin
        <span className="text-green-500"> Dashboard</span>
      </h1>


      <div className="mt-20">
              <button
        onClick={async()=> await signOut()}
     
        className="mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-md"
      >
      signout
      </button>
      </div>
    </section>
  );
};
export default Dashboard;
