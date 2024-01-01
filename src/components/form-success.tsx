import {CheckCircle2} from 'lucide-react';

function FormSuccess({message}: {message?: string}) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/10 p-3 rounded-md flex justify-center items-center text-sm text-emerald-500">
      <CheckCircle2 className="w-4 h-4 mr-2" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccess;
