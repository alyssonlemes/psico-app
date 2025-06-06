
'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api'; // Import the API helper

// Define an interface for the expected patient data structure
interface Patient {
  id: string;
  name: string;
  // Add other relevant patient fields here
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        // Example: Fetching a list of patients from the API
        // Replace '/patients' with your actual API endpoint
        // Replace <Patient[]> with the expected response type from your API
        const data = await api.get<Patient[]>('/patients');
        setPatients(data);
      } catch (err: any) {
        console.error('Failed to fetch patients:', err);
        setError(err.message || 'Failed to load patient data. Please ensure the API is running and the endpoint is correct.');
      }
      setLoading(false);
    };

    fetchPatients();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Patients</h1>

      {loading && (
        <p className="text-gray-600">Loading patient data...</p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && (
        <div>
          <p className="mb-4 text-gray-600">Manage your patients here. Below is an example list fetched from the API.</p>
          {patients.length > 0 ? (
            <ul className="space-y-2">
              {patients.map((patient) => (
                <li key={patient.id} className="bg-white p-3 rounded shadow-sm border border-gray-200">
                  {patient.name}
                  {/* Add more patient details or actions here */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No patients found or API endpoint not returning data.</p>
          )}
          {/* Add components for adding/editing patients here */}
        </div>
      )}
    </div>
  );
}

