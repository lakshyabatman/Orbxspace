import { Button, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext";
import { NetworkType } from "../../models";

const Navbar = () => {

    const context = useContext(AppContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const connectWallet = (network: NetworkType) => {
        context?.connectWallet(network);
        setIsModalOpen(false)
    }

    
    if(context == null) return <h1>ERROR</h1>
    
    return (
        <>
        <Modal open={isModalOpen}  >
            <div className="text-center">
                <h3 className="text-3xl font-semibold text-[#69248A]">Connect to Orbis</h3>
                <p className="my-3 text-xl">With your wallet</p>
                <hr />
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
                <Button className="mb-4 bg-[#B45008] text-white w-44 " onClick={() => connectWallet(NetworkType.Ethereum)}>Metamask</Button>
                <Button className="bg-[#201191] text-white  w-44 " onClick={() => connectWallet(NetworkType.Solana)}>Phantom</Button>
            </div>
        </Modal>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }} className="p-4 bg-[#69248A] text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-between items-center ">
                    {/* Community data */}
                    {context.groupDetails?.content.pfp ? <img src={context.groupDetails?.content.pfp} className="max-h-12 mr-10 rounded-full"/> : null}

                    <h2>{context.groupDetails?.content.name ? context.groupDetails.content.name : null}</h2>
                </div>
                <div>
                    {context.connectedAddress ? <Button className="text-white" disabled><span className="text-white">{context.connectedAddress.slice(0,8) + `...`}</span></Button> : <Button type="default" className="text-white" onClick={openModal}>Connect Wallet</Button>}
                </div>
            </div>
        </Header>
        </>
    )
}

export default Navbar;