import React, { useState } from 'react';
import { connectFirebase } from './firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

let db = null;
const COLLECTION_NAME = 'Data';

const Home = () => {
  const [studentName, setStudentName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [grade, setGrade] = useState('');
  const [records, setRecords] = useState([]);
  const [view, setView] = useState('add'); // 'add' or 'show'

  const handleFirebaseClick = () => {
    try {
      const firebase = connectFirebase();
      db = firebase.db;
      alert('🎉 Firebase connected successfully!');
      console.log('Firestore DB:', db);
    } catch (err) {
      console.error('❌ Firebase connection failed:', err);
      alert('Error connecting Firebase');
    }
  };

  const handleAddRecord = async () => {
    if (!db) return alert('⚠️ Firebase is not connected yet!');

    const product = {
      studentName,
      subjectName,
      grade,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, COLLECTION_NAME), product);
      alert('✅ Record added to Firebase!');
      setStudentName('');
      setSubjectName('');
      setGrade('');
    } catch (err) {
      console.error('❌ Failed to add record:', err);
      alert('Error adding record');
    }
  };

  const handleShowRecords = async () => {
    if (!db) return alert('⚠️ Firebase is not connected yet!');
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setRecords(products);
      setView('show');
    } catch (err) {
      console.error('❌ Failed to fetch records:', err);
      alert('Error fetching records');
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen font-serif text-center p-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-orange-500 py-4">
        <span className="text-orange-700">University</span>{' '}
        <span className="text-orange-500">of Lahore</span>
      </h1>

      {/* Nav Tabs */}
      <div className="flex justify-center bg-gray-300 py-2 space-x-4">
        <button
          onClick={() => setView('add')}
          className={`bg-white px-4 py-1 border text-sm hover:bg-gray-100 ${
            view === 'add' && 'bg-orange-200'
          }`}
        >
          Add Record
        </button>
        <button
          onClick={handleShowRecords}
          className={`bg-white px-4 py-1 border text-sm hover:bg-gray-100 ${
            view === 'show' && 'bg-orange-200'
          }`}
        >
          Show Records
        </button>
      </div>

      {/* Firebase Init */}
      <div className="my-8">
        <h2 className="text-3xl font-semibold mb-4">Initialize Firebase</h2>
        <button
          onClick={handleFirebaseClick}
          className="px-4 py-2 border text-sm bg-white hover:bg-gray-100"
        >
          Firebase Connection
        </button>
      </div>

      {/* Add Record View */}
      {view === 'add' && (
        <div className="border-t border-black mx-8 pt-6">
          <h2 className="text-3xl font-semibold mb-6">Add Record</h2>
          <div className="flex justify-center space-x-6 mb-4">
            <div className="text-left">
              <label className="block text-sm font-semibold mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border px-2 py-1 w-48"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-semibold mb-1">Subject Name</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="border px-2 py-1 w-48"
              />
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <div className="text-left">
              <label className="block text-sm font-semibold mb-1">Grade / CGPA</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="border px-2 py-1 w-48"
              />
            </div>
          </div>
          <button
            onClick={handleAddRecord}
            className="px-4 py-2 border text-sm bg-white hover:bg-gray-100"
          >
            Add Record
          </button>
        </div>
      )}

      {/* Show Records View */}
      {view === 'show' && (
        <div className="mx-8 pt-6 text-left">
          <h2 className="text-3xl font-semibold mb-6 text-center">All Records</h2>
          {records.length === 0 ? (
            <p className="text-center text-gray-500">No records found.</p>
          ) : (
            <table className="table-auto w-full border">
              <thead className="bg-orange-100">
                <tr>
                  <th className="border px-4 py-2">Student</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Grade</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border px-4 py-2">{item.studentName}</td>
                    <td className="border px-4 py-2">{item.subjectName}</td>
                    <td className="border px-4 py-2">{item.grade}</td>
                    <td className="border px-4 py-2">
                      {item.timestamp?.toDate?.().toLocaleDateString() || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
