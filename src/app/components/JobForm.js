"use client";

import { faEnvelope, faStar, faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField, TextArea, Theme } from "@radix-ui/themes";
import { RadioGroup } from "@radix-ui/themes";
import { useState } from "react";
import { saveJobAction } from "../actions/jobActions";
import { redirect } from "next/navigation";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ImageUpload from "./ImageUpload";

export default function JobForm({orgId, jobDoc}) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || "");
  const [stateName, setStateName] = useState(jobDoc?.state || "");
  const [cityName, setCityName] = useState(jobDoc?.city || "")

  async function handleSaveJob(data){
    data.set('country', countryName.toString());
    data.set('state', stateName.toString());
    data.set('city', cityName.toString());
    data.set("countryId", countryId.toString());
    data.set("stateId", stateId.toString());
    data.set("cityId", cityId.toString());
    data.set('orgId', orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`)
  }
  
  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container my-6 flex flex-col gap-4"
      >{jobDoc && (
        <input type="hidden" name="id" value={jobDoc?._id}/>
      )}
        <TextField.Root name="title" placeholder="Job title" defaultValue={jobDoc?.title || ""}/>
        <div className="grid md:grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root defaultValue={jobDoc?.remote || "hybrid"} name="remote">
              <RadioGroup.Item value="on-site">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || "full-time"} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part-time">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full-time">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary (k/y)
            <div className="flex gap-2">
              <TextField.Root name="salary" defaultValue={jobDoc?.salary || ""}>
                <TextField.Slot>$</TextField.Slot>
                <TextField.Slot>k/year</TextField.Slot>
              </TextField.Root>
            </div>
          </div>
        </div>
        <div>
          <h6>Location</h6>
          <div className="flex flex-col sm:flex-row gap-6 *:grow">
            <CountrySelect
              defaultValue={countryId ?  {id:countryId, name:countryName}: 0}
              onChange={(e) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              defaultValue={stateId ?  {id:stateId, name:stateName}: 0}
              countryid={countryId}
              onChange={(e) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              defaultValue={cityId ?  {id:cityId, name:cityName}: 0}
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="sm:flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ""} />
          </div>
          <div className="grow">
            <h3>Contact info</h3>
            <div className="sm:flex gap-2">
              <div className="mb-2">
                <ImageUpload name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || ""} />
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root 
                  placeholder="John Doe" 
                  name="contactName" 
                  defaultValue={jobDoc?.contactName || ""}>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
          placeholder="Job description"
          resize="vertical"
          name="description"
          defaultValue={jobDoc?.description || ""}
        />
        <div>
          <button
            size="3"
            type="submit"
            className="w-full p-2 text-center bg-violet-700 rounded-md hover:opacity-85 text-slate-100"
          >
            Save
          </button>
        </div>
      </form>
    </Theme>
  );
}
