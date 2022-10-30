import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ESort,
  FilterByCountryConstants,
  FilterByGenderConstants,
  SortByNameConstants,
} from "../constants";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGetUsersQuery } from "../store/user/user.api";
import Loader from "./loader";
import { Search } from "./search";
import { Select } from "./select";

export const UsersList = () => {
  const { data, isLoading, isError } = useGetUsersQuery(16);
  const { getUsers, sortByFirstName, sortByLastName } = useActions();
  const { users } = useTypedSelector((state) => state);

  const [sortValue, setSortValue] = useState<string | undefined>(undefined);
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const sortHandler = (selectedValue: string) => {
    setSortValue(selectedValue);
  };

  const genderFilterHandler = (selectedValue: string) => {
    if (selectedValue === "") {
      setGenderFilter("");
    }
    setGenderFilter(selectedValue);
  };

  const countryFilterHandler = (selectedValue: string) => {
    if (selectedValue === "") {
      setCountryFilter("");
    }
    setCountryFilter(selectedValue);
  };

  // useEffect for filter users data
  useEffect(() => {
    if (data) {
      getUsers({
        data: data.results,
        filter: { gender: genderFilter, country: countryFilter, search },
      });
    }
  }, [data, genderFilter, countryFilter, search]);

  // useEffect for sort users data
  useEffect(() => {
    switch (sortValue) {
      case ESort.FirstName:
        sortByFirstName();
        break;
      case ESort.LastName:
        sortByLastName();
        break;
    }
  }, [sortValue]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red">Error...</div>
      ) : (
        <div>
          <div className="my-10 flex justify-around">
            <Search handleSearchChange={setSearch} />
            <Select
              headerText="Select an option to sort users"
              onChange={sortHandler}
              options={SortByNameConstants}
            />
            <Select
              headerText="Select an option to filter users by gender"
              onChange={genderFilterHandler}
              options={FilterByGenderConstants}
            />
            <Select
              headerText="Select an option to filter users by country"
              onChange={countryFilterHandler}
              options={FilterByCountryConstants}
            />
          </div>

          <ul className="grid grid-cols-4 place-items-center gap-4">
            {/* index is not a good decision in real project, but in this case is better option then id.valueб 
              because id.value have a lot of null value, and it's create some colision
            */}
            {users?.map((user, index) =>
              !user ? (
                <Loader />
              ) : (
                <li
                  key={`key-${index}`}
                  className="w-full rounded-lg border border-gray-200 bg-white shadow-md"
                >
                  <div className="flex min-h-[80px] items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={user.picture.medium}
                        width={60}
                        height={60}
                        alt="userImage"
                        className="mx-2 rounded-full"
                      />
                    </div>
                    <div className="flex-1 px-3">
                      <p className="break-words text-sm font-medium text-gray-900">
                        {user.name.first} {user.name.last}
                      </p>
                      <p className="break-words text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
};
