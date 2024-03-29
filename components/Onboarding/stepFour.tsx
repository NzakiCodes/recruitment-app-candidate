import { useGetUserSkills } from "@api/queries/user";
import SelectableLabel from "@components/Atoms/SelectableLabel";
import Spinner from "@components/Spinner";
import { JobInterests } from "@interface/jobs";
import React, { FC, useState } from "react";

interface OnboardingStep4 {
  selectedSkills: string[];
  setSelectedSkills: Function;
}

const OnboardingStepFour: FC<OnboardingStep4> = ({
  selectedSkills,
  setSelectedSkills,
}) => {
  const { data, isLoading } = useGetUserSkills();
  const skills = data?.data;
  const [skill, setSkill] = useState<string>("");
  const [userSkills, setUserSkills] = useState<string[]>([]);

  const handleCheckBoxChange = (name: string) => {
    console.log(name);
    if (selectedSkills.indexOf(name) !== -1) {
      setSelectedSkills(
        selectedSkills.filter((selectedId: string) => selectedId !== name)
      );
    } else {
      setSelectedSkills([...selectedSkills, name]);
    }
  };

  return (
    <div className="lg:w-full lg:mx-5 flex flex-wrap gap-x-3 gap-y-1">
      {isLoading ? (
        <Spinner />
      ) : (
        skills?.map((skill: JobInterests, index: number) => (
          <SelectableLabel
            key={index}
            label={skill.name}
            value={skill.name}
            isChecked={selectedSkills.includes(skill.name)}
            onChange={(e) => handleCheckBoxChange(e.target.value)}
          />
        ))
      )}
      {userSkills &&
        userSkills?.map((skill: string, index: number) => (
          <SelectableLabel
            key={index}
            label={skill}
            value={skill}
            isChecked={selectedSkills.includes(skill)}
            onChange={(e) => handleCheckBoxChange(e.target.value)}
          />
        ))}
      <hr className="my-8  w-full" />
      <div>
        <span className="inline-block mb-4 font-semibold text-xl text-secondary">
          Add your own skills
        </span>
        <div className="w-full rounded-lg py-1 text-[#63748A] border-[#DEE3E9] border hover:border-secondary hover:text-secondary transition-colors hover:transition-colors font-medium text-[18px] flex gap-5 my-3">
          <input
            type="text"
            placeholder="Enter Skill"
            className="w-4/6 lg:w-5/6 px-8 py-4 h-full active:outline-0 focus:outline-0"
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />
          <button
            className="h-full border-l  border-[#DEE3E9] w-2/6 lg:w-1/6 py-4"
            onClick={() => {
              setUserSkills([...userSkills, skill]);
              setSkill("");
            }}
          >
            Add +
          </button>
        </div>
        <span className="inline-block my-4 font-medium text-sm text-[#63748A]">
          {" I'll"} try to find jobs that match as many of these skills as I
          can. If you add multiple skills, some jobs might not match every skill
          you choose.
        </span>
      </div>
    </div>
  );
};

export default OnboardingStepFour;
