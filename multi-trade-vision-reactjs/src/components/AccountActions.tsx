import React, { useState } from "react";
const AccountActions: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
    setShowConfirm(false);
    setTimeout(() => setDeleted(false), 2000);
  };
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Account Actions</h2>
      <button className="btn btn-danger w-fit" onClick={() => setShowConfirm(true)}>Delete Account</button>
      <button className="btn btn-secondary w-fit">Logout</button>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
            <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {deleted && <span className="text-red-500">Account deleted!</span>}
    </div>
  );
};
export default AccountActions; 