import { Divider, Modal, Radio, Space, Title, Text, Container } from "@mantine/core"
import { useEffect, useState } from "react";
import GenerateQuizButton from "./generateQuizButton"
import { IClass } from "./learn";

interface LessonModalProps {
    currentClass: IClass | undefined
    setCurrentClass: (value: IClass | undefined) => void;
}

export default function LessonModal({currentClass, setCurrentClass}: LessonModalProps) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false)
        }, []
    );
    
    return (
        <Modal
          centered
          size="100%"
          opened={currentClass != null}
          onClose={() => {
            setLoaded(false)
            setCurrentClass(undefined)}
        }
        >
            <Container>
                <Title my="xl">
                    {currentClass?.title}
                </Title>
                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed id semper risus in hendrerit gravida rutrum quisque. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Magna sit amet purus gravida quis blandit turpis. Orci dapibus ultrices in iaculis nunc sed augue lacus. Convallis convallis tellus id interdum velit laoreet. Interdum velit laoreet id donec. Sit amet aliquam id diam maecenas. Nulla facilisi nullam vehicula ipsum a arcu cursus. Ornare suspendisse sed nisi lacus. Id neque aliquam vestibulum morbi blandit cursus. Ac placerat vestibulum lectus mauris ultrices. Non blandit massa enim nec dui. Egestas erat imperdiet sed euismod nisi porta lorem mollis. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Interdum varius sit amet mattis vulputate enim. Faucibus et molestie ac feugiat sed lectus vestibulum. Pretium aenean pharetra magna ac placerat vestibulum. Aliquam ut porttitor leo a diam sollicitudin. Vehicula ipsum a arcu cursus vitae.

                Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Accumsan tortor posuere ac ut consequat semper viverra nam. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Urna neque viverra justo nec ultrices dui sapien eget mi. Pellentesque id nibh tortor id aliquet lectus proin. Lectus mauris ultrices eros in cursus. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Vitae ultricies leo integer malesuada nunc vel risus commodo. Lacus vestibulum sed arcu non. Vitae sapien pellentesque habitant morbi. Odio ut sem nulla pharetra diam sit. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris nunc congue. Venenatis a condimentum vitae sapien.

                Laoreet suspendisse interdum consectetur libero. Euismod quis viverra nibh cras pulvinar. Sit amet cursus sit amet dictum sit amet. Commodo ullamcorper a lacus vestibulum. Malesuada nunc vel risus commodo viverra maecenas. Sed velit dignissim sodales ut eu. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tempor id eu nisl nunc mi. Ut consequat semper viverra nam libero justo. Pellentesque sit amet porttitor eget dolor morbi. Nam at lectus urna duis convallis convallis tellus id interdum. Justo eget magna fermentum iaculis eu non.

                Arcu ac tortor dignissim convallis aenean et tortor at. Sodales ut etiam sit amet. Sit amet justo donec enim diam vulputate ut pharetra sit. Amet nisl purus in mollis nunc. In vitae turpis massa sed elementum tempus. Condimentum id venenatis a condimentum vitae. Ornare arcu odio ut sem nulla. Sagittis eu volutpat odio facilisis mauris sit. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.

                Sed turpis tincidunt id aliquet. In mollis nunc sed id semper risus in hendrerit gravida. Tortor id aliquet lectus proin nibh nisl condimentum id. Nulla porttitor massa id neque aliquam vestibulum. Nunc non blandit massa enim nec dui. Ut tellus elementum sagittis vitae et. Elit ut aliquam purus sit amet luctus venenatis lectus. Tellus at urna condimentum mattis pellentesque id nibh. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Non tellus orci ac auctor augue mauris augue. Non tellus orci ac auctor. Adipiscing vitae proin sagittis nisl. Scelerisque eleifend donec pretium vulputate sapien nec. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Fames ac turpis egestas maecenas. Metus dictum at tempor commodo ullamcorper a.
                </Text>

                <Space h="xl"></Space>


                {
                    !loaded ?  
                    (
                        <GenerateQuizButton loaded={loaded} setLoaded={setLoaded}></GenerateQuizButton>
                    ) : 
                    (
                       <>
                        <Divider></Divider>
                        <Title my="xl">
                            Quiz
                        </Title>

                        <Radio.Group
                            mx="xl"
                            name="favoriteFramework"
                            orientation="vertical"
                            label="What type of 401(k) plan requires that taxes be paid immediately?"
                            mt="xl"
                        >
                            <Radio value="simple" label="Simple IRA" />
                            <Radio value="traditional" label="Traditional 401(k)" />
                            <Radio value="sep" label="SEP IRA" />
                            <Radio value="roth" label="Roth 401(k)" />
                        </Radio.Group>

                        <div className="flex justify-items-end">
                            <div className="grow"></div>  
                            <button
                                onClick={async () => {
                                    console.log("hello")
                                }}
                                type="button"
                                className="text-black border rounded-lg py-2 text-left px-4 w-fit hover:bg-blue-500 hover:border-white hover:text-white transition"
                            >
                                Submit Answers
                            </button>
                        </div>                     
                       </>
                    )
                }

                <Space h="xl"></Space>
                <Space h="xl"></Space>
                <Space h="xl"></Space>  
            </Container>
        

        </Modal>
    )
}