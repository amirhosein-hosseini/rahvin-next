"use client"
import axios from "axios";
import "./Singlec.css";
import Image from "next/image";
import ProductItem from "../ProductItem/ProductItem";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import domain from "@/domain";

const Singlec = ({title , desc , files = null , slug , keyword , related , cover , body , banner}) =>{

    const [mostView , setMostView] = useState([])

    let bannery = null;
    let covery = null;
    banner == undefined ? bannery = "" : bannery = domain + banner;
    cover == undefined ? covery = "" : covery = domain + cover;




    useEffect(()=>{
        axios.get(`${domain}/api/v1/blogs/view-count`)
        .then(function (response) {
            // handle success
            setMostView(response.data.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
    },[])



    return(
        <div className="container">
            <div className="single">
                <div className="single-left">
                    <div className="single-right-title">
                        <p>
                            {title}
                        </p>
                    </div>
                    <div className="single-way">
                        <p>
                            {slug}
                        </p>
                    </div>
                    <div className="single-right-one-image">
                        <Image src={covery} sizes="100vw" width={200} height={200} style={{width: '100%',height: 'auto',}} alt="image" />
                    </div>
                    <div className="single-desc">
                        <p>
                            {desc}
                        </p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: body }}></div>
                </div>
                <div className="single-right">
                    <div className="single-left-bar">
                        <div className="single-left-title">
                            <p>
                                مطالب پربازدید
                            </p>
                        </div>
                        {mostView.map((item)=>(
                            <div className="single-left-item">
                                <Link href={`/Single/${item.slug}`} style={{textDecoration:"none"}}>
                                    <p>
                                        {item.title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="single-left-banner">
                        <Image src={bannery} sizes="100vw" width={200} height={200} style={{width: '100%',height: 'auto',}} alt="image" />
                    </div>
                </div>
            </div>
            <div className="single-related">
                <div className="single-related-title">
                    <p>
                        مطالب مرتبط
                    </p>
                </div>
                <div className="single-related-wrapper">
                    {related.map((item)=>(
                        <ProductItem title={item.title} desc={item.description} src={domain+item.cover_file} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Singlec;