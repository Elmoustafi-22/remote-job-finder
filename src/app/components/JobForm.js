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

export default function JobForm({orgId}) {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('')

  async function handleSaveJob(data){
    data.set('country', countryName.toString());
    data.set('state', stateName.toString());
    data.set('city', cityName.toString());
    data.set('orgId', orgId)
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`)
  }
  
  return (
    <Theme>
      <form action={handleSaveJob} className="container my-6 flex flex-col gap-4">
        <TextField.Root name="title" placeholder="Job title" />
        <div className="grid grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root defaultValue="hybrid" name="remote">
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue="full" name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary (k/y)
            <div className="flex gap-2">
              <TextField.Root name="salary">
                <TextField.Slot>$</TextField.Slot>
                <TextField.Slot>k/year</TextField.Slot>
              </TextField.Root>
            </div>
          </div>
        </div>
        <div>
          <h6>Location</h6>
          <div className="flex gap-6 *:grow">
            <CountrySelect
              onChange={(e) => {
                setCountryId(e.id);
                setCountryName(e.name)
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              countryid={countryId}
              onChange={(e) => {
                setStateId(e.id);
                setStateName(e.name)
              }}
              placeHolder="Select State"
            />
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => {
                setCityId(e.id);
                setCityName(e.name)
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload name="jobIcon" icon={faStar} />
          </div>
          <div className="grow">
            <h3>Contact info</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload name="contactPhoto" icon={faUser} />
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root placeholder="John Doe" name="contactName">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="phone" type="tel" name="contactPhone">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Email" type="email" name="contactEmail">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea placeholder="Job description" resize="vertical" name="description"/>
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
