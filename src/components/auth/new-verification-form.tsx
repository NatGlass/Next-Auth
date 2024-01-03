'use client';

import {newVerification} from '@/actions/new-verification';
import CardWrapper from '@/components/auth/card-wrapper';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {PacmanLoader} from 'react-spinners';
import FormError from '../form-error';
import FormSuccess from '../form-success';

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token');
      return;
    }

    newVerification(token)
      .then(data => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [error, success, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <PacmanLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
