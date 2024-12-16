const SocialProof = ({ socialProofText }: { socialProofText: string }) => {
  return (
    <div className="w-screen min-h-[30vh] -skew-y-3 -mt-20 py-10 shadow-2xl flex flex-row items-center justify-center bg-slate-900 lg:-mt-48">
      <div className="max-w-[84%] h-full mx-auto flex flex-col justify-center items-center skew-y-3 py-10 lg:w-1/2">
        <h2 className="text-slate-100 text-3xl font-semibold text-center italic ">
          {socialProofText}
        </h2>
      </div>
    </div>
  );
};

export default SocialProof;
