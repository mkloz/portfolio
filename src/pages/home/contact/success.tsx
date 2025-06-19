import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <CheckCircle2 className="text-green-500 w-20 h-20 mb-6" />
      <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Thank you for reaching out. I will get back to you soon.</p>
      <p className="text-sm text-gray-400">Redirecting to the main page...</p>
    </div>
  );
};

export default Success;
