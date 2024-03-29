import OnboardingStepFive from "@components/Onboarding/stepFive";
import OnboardingStepFour from "@components/Onboarding/stepFour";
import OnboardingStepOne from "@components/Onboarding/stepOne";
import OnboardingStepSeven from "@components/Onboarding/stepSeven";
import OnboardingStepSix from "@components/Onboarding/stepSix";
import OnboardingStepThree from "@components/Onboarding/stepThree";
import OnboardingStepTwo from "@components/Onboarding/stepTwo";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import { OnboardingLayout } from "../../components/Layouts";
import Progress from "../../components/Molecules/Progress";
import AuthContext from "../../context/authContext";
import { useToast } from "../../context/toastContext";
import { JobSearchOption } from "../../interfaces/jobs";
import { UserResponse } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import { useSignUpCandidtate } from "../api/mutations/auth";
import { PageWithlayout } from "../_app";

interface IUserSignUp {
  fullName: string;
  email: string;
  password: string;
}

const Onbording: PageWithlayout = () => {
  const router = useRouter();
  const { mutate } = useSignUpCandidtate();
  const { updateSignUpState, signUpState, setAuthAndCache } =
    useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToast();
  const totalSteps = 7;
  const [jobOptionSelect, setJobOptionSelect] = useState<string>(
    JobSearchOption.LOOKINGFORJOB
  );
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const [selectedJobLocation, setSelectedJobLocation] = useState<string>("");
  const [selectJobStation, setSelectedJobStation] = useState<string[]>([]);
  const [selectWorkIndustry, setSelectedWorkIndustry] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [progressCount, setProgressCount] = useState<number>(1);

  const handleBack = () => {
    setProgressCount(progressCount - 1);
  };

  const updateStep = () => {
    setProgressCount(progressCount + 1);
  };

  const handleNext = () => {
    if (progressCount === 1) {
      if (jobOptionSelect === "") {
        toast.error("Please select an option");
      } else {
        updateSignUpState({ ...signUpState, job_urgency: jobOptionSelect });
        updateStep();
      }
    } else if (progressCount === 2) {
      if (selectedJobType.length < 1) {
        toast.error("Please select 1 or more options");
      } else {
        updateSignUpState({
          ...signUpState,
          employment_demand: selectedJobType,
        });
        updateStep();
      }
    } else if (progressCount === 3) {
      if (selectedJobLocation === "" || selectJobStation.length < 1) {
        toast.error(
          "Please select one or more options and enter your location"
        );
      } else {
        updateSignUpState({
          ...signUpState,
          work_location: selectedJobLocation,
          work_model: selectJobStation,
        });
        updateStep();
      }
    } else if (progressCount === 4) {
      if (selectedSkills.length < 1) {
        toast.error("Please select 2 or more skills");
      } else {
        updateSignUpState({
          ...signUpState,
          skills: selectedSkills,
        });
        updateStep();
      }
    } else if (progressCount === 5) {
      if (selectWorkIndustry.length < 1) {
        toast.error("Please select one or more options");
      } else {
        updateSignUpState({
          ...signUpState,
          industry_categories: selectWorkIndustry,
        });
        updateStep();
      }
    } else if (progressCount === 6) {
      if (
        inputs.email === undefined ||
        inputs.fullName === undefined ||
        inputs.password === undefined
      ) {
        toast.error("Please enter your full name, email and password");
      } else {
        submit();
      }
    } else if (progressCount === 7) {
      router.push("/jobs/suggested");
    }
  };

  const submit = () => {
    setLoading(true);
    mutate(
      {
        ...signUpState,
        fullName: inputs.fullName,
        email: inputs.email,
        password: inputs.password,
      },
      {
        onSuccess: async (response: AxiosResponse<UserResponse>) => {
          const { data } = response;
          setAuthAndCache(data.access_token);
          toast.success("Signup Successful");
          updateStep();
          setLoading(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error.message) {
              toast.error(error.message);
              setLoading(false);
            }
            toast.error(error.response?.data.data.message);
            setLoading(false);
          } else {
            toast.error(`${error}`);
            setLoading(false);
          }
        },
      }
    );
  };

  const { handleChange, inputs } = useForm<IUserSignUp>(
    {} as IUserSignUp,
    submit
  );

  return (
    <div className="relative">
      <div className="py-8 lg:py-4 px-5 mx-auto max-w-xl lg:h-screen mb-32">
        <div className="flex justify-center items-center  lg:h-full w-full">
          <div className="w-full">
            {progressCount === 1 && (
              <OnboardingStepOne
                jobOptionSelect={jobOptionSelect}
                setJobOptionSelect={setJobOptionSelect}
              />
            )}
            {progressCount === 2 && (
              <OnboardingStepTwo
                selectedJobType={selectedJobType}
                setSelectedJobType={setSelectedJobType}
              />
            )}
            {progressCount === 3 && (
              <OnboardingStepThree
                selectedJobLocation={selectedJobLocation}
                setSelectedJobLocation={setSelectedJobLocation}
                selectJobStation={selectJobStation}
                setSelectedJobStation={setSelectedJobStation}
              />
            )}
            {progressCount === 4 && (
              <OnboardingStepFour
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
              />
            )}
            {progressCount === 5 && (
              <OnboardingStepFive
                selectWorkIndustry={selectWorkIndustry}
                setSelectedWorkIndustry={setSelectedWorkIndustry}
              />
            )}
            {progressCount === 6 && (
              <OnboardingStepSix handleChange={handleChange} />
            )}
            {progressCount === 7 && <OnboardingStepSeven />}
          </div>
        </div>
      </div>
      <div className="fixed z-30 bottom-0 w-full lg:w-1/2 bg-white mt-3 right-0">
        <Progress
          progressCount={progressCount}
          totalSteps={totalSteps}
          handleNext={handleNext}
          handleBack={handleBack}
          loading={loading}
        />
      </div>
    </div>
  );
};

Onbording.title = "Do you know what you're looking for?";

Onbording.getLayout = function getLayout(page: ReactNode, title?: string) {
  return <OnboardingLayout title={title ? title : ""}>{page}</OnboardingLayout>;
};

export default Onbording;
