import { useEffect, useState } from "react";
import "./DropDown.css";
import axios from "axios";
import domain from "@/domain";
import Link from "next/link";

const DropDown = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subnumber, setSubnumber] = useState(0);
  const [showSubCategories, setShowSubCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${domain}/api/v1/categories/menu`)
      .then(function (response) {
        // handle success
        setCategories(response.data.data);
        const data = response.data.data;
        const subcategory = data.map((item) => item.childCategory || []);
        setSubCategories(subcategory);
        setShowSubCategories(subcategory[0]); // Set initial value to the first item
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <>
      <ul className="drop-down-topic-wrapper">
        {categories.map((item, index) => (
          <Link href={`/Blog/${item.slug}`}>
            <li
              key={item.id}
              className="drop-down-topic"
              onMouseEnter={() => {
                setSubnumber(index);
                setShowSubCategories(subCategories[index]); // Update showSubCategories on category change
              }}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <div className="dorp-down-items-wrapper">
        {showSubCategories.map((item) => (
          <div key={item.id} className="drop-down-item">
            <Link href={`/Blog/${item.slug}`}>
              <p className="drop-down-item-title">{item.title}</p>
            </Link>

            {item.childCategory?.map((itemy) => (
              <Link href={`/Blog/${itemy.slug}`}>
                <p className="drop-down-item-item" key={itemy.id}>
                  {itemy.title}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DropDown;