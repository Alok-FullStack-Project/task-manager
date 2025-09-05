export default function Footer() {
  return (
    <footer className="bg-white shadow p-4 text-center text-gray-500">
      © {new Date().getFullYear()} TaskManager. All rights reserved.
    </footer>
  );
}
