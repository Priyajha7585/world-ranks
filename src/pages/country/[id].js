import Layout from "@/src/components/Layout/Layout";
import { useEffect, useState } from "react";
import styles from './Country.module.css';

const getCountry = async(id) => {
    const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
    const country = await res.json();
    console.log(country)
    return country;
}

const Country = ({country}) => {
    const [borders, setBorders] = useState([]);
    const getBorders = async() => {
        if(country.borders)
        {
            const allBorders = await Promise.all( country.borders.map(border=>getCountry(border)));
            console.log(allBorders)
            setBorders(allBorders);

        }
    }
    useEffect(()=>{
        getBorders();
    }, [])
    console.log(country)
    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name}/>
                        <h1  className={styles.overview_name}>{country.name}</h1>
                        <div  className={styles.overview_region}>{country.region}</div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>
                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area}</div>
                                <div className={styles.overview_label}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Capital</div>
                            <div className={styles.details_panel_value}>{country.capital}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Subregion</div>
                            <div className={styles.details_panel_value}>{country.subregion}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Language</div>
                            <div className={styles.details_panel_value}>{country.languages.map(({name})=>name).join(', ')}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Currencies</div>
                            <div className={styles.details_panel_value}>{country.currencies.map(({name})=>name).join(", ")}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Native Name</div>
                            <div className={styles.details_panel_value}>{country.nativeName}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Gini</div>
                            <div className={styles.details_panel_value}>{country.gini || 0} %</div>
                        </div>
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>
                            <div className={styles.details_panel_borders_container}>
                                {borders && borders.map(({flag, name})=><div>
                                    <img src={flag} alt={name}  className={styles.details_panel_borders_country}/>
                                    <div  className={styles.details_panel_borders_name}>{name}</div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country;

export const getServerSideProps = async({params}) => {
    console.log("Country id page")
    console.log(params)
    // const res = await fetch(`https://restcountries.com/v2/name/${params.id}`);
    const country = await getCountry(params.id);
    // console.log(country)
    return {
        props:{
            country:country
        }
    }
}