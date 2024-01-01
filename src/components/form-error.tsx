import {AlertCircle} from 'lucide-react';

function FormError({message}: {message?: string}) {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 p-3 rounded-md flex justify-center items-center text-sm text-destructive">
      <AlertCircle className="w-4 h-4 mr-2" />
      <p>{message}</p>
    </div>
  );
}

export default FormError;
