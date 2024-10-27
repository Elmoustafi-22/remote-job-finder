"use client";

import { faEnvelope, faStar, faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField, TextArea, Theme } from "@radix-ui/themes";
import { RadioGroup } from "@radix-ui/themes";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ImageUpload from "./ImageUpload";

export default function JobForm() {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0)

  return (
    <Theme>
      <form action="" className="container my-6 flex flex-col gap-4">
        <TextField.Root placeholder="Job title" />
        <div className="grid grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root defaultValue="hybrid" name="example">
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue="full" name="example">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary (k/y)
            <div className="flex gap-2">
              <TextField.Root>
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
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              countryid={countryId}
              onChange={(e) => {
                setStateId(e.id);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => {
                console.log(e);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <div className="bg-gray-100 border border-dotted rounded-md size-24 inline-flex items-center content-center justify-center">
              <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            </div>
            <div className="mt-2">
              <Button variant="soft">Select file</Button>
            </div>
          </div>
          <div className="grow">
            <h3>Contact info</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload icon={faUser}/>
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root placeholder="John Doe">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="phone" type="tel">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Email" type="email">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea placeholder="Job description" resize="vertical" />
        <div>
          <button size="3" type="submit" className="w-full p-2 text-center bg-violet-700 rounded-md hover:opacity-85 text-slate-100">Save</button>
        </div>
      </form>
    </Theme>
  );
}
