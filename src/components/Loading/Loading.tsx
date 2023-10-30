import styles from "./loading.module.css"
import loadingImg from "../../imgs/loading.gif"

const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src={loadingImg} />
        </div>
    );
};

export default Loading;