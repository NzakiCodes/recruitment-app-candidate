import React, { useState } from "react";
import Icon from "../../../Atoms/Icon";
import ProfileCard from "../../../Atoms/ProfileCard";
import Modal from "../../../Molecules/Modal";

const Education = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <div>
        <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
          <div className="px-5 py-5">
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)}>
                <Icon icon="cancel" />
              </button>
            </div>
            <div className="px-3 py-4">Education</div>
          </div>
        </Modal>
      </div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-x-3 bg-[#E1EEFB] py-6 rounded-lg"
        >
          <Icon icon="plusCircle" />
          <span className="font-semibold text-secondary text-base">
            Add Education
          </span>
        </button>
      </div>
      <div>
        <ProfileCard
          role="Macman College"
          company="SSCE"
          duration="September 2014 - 2019"
          edit={() => {}}
        />
        <ProfileCard
          role="Abia State University"
          company="Bachelor of Science - BSc Economics"
          duration="March 2019 - 2020"
          edit={() => {}}
        />
      </div>
    </div>
  );
};

export default Education;