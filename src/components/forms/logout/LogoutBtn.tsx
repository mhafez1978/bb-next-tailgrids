export default function LogoutBtn() {
  const handleLogout = async () => {
    try {
      // Redirect to the logout API route
      window.location.href = "/api/auth/logout";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
