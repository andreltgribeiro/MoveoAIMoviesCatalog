import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function Error({ customMessage, error }) {
  return (
    <div className="w-full flex justify-center items-center">
      <ExclamationCircleIcon className="size-8 text-zinc-50" />
      <h1 className="text-3xl underline text-zinc-50">
        {customMessage
          ? customMessage
          : `There was an error loading movies (${error.message})`}
      </h1>
    </div>
  );
}

export default Error;
