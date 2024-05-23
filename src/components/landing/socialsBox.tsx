import config from "config";

const SocialBox = () => {
    return (
        <div className="flex flex-row bg-Primary w-[80%] max-w-[600px] m-auto p-5 rounded-3xl place-content-around mt-10 resp:p-4">
            {config.socials.map((social, index) => {
                return (
                    <a id={social.name} href={social.url} key={social.name}>
                        <img
                            className="h-9 resp:h-7"
                            src={social.icon}
                            alt={social.name}
                        />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialBox;
