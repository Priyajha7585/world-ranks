import {FaSearch} from 'react-icons/fa';
import styles from './SearchInput.module.css'
const SearchInput = ({...rest}) => {
    return <div className={styles.wrappers}>
        <FaSearch color='inherit'/>
        <input  className={styles.input} {...rest}  />
    </div>
}

export default SearchInput;