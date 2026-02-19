import React, { createContext, useContext, useEffect, useState } from "react";

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Navigation imports---////////////////////
import { useNavigate } from "react-router-dom";

//////////////---Supabase imports---////////////////////
import { supabase } from "../supabase/supabaseClient";
import { Session, User } from '@supabase/supabase-js';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Nanoid imports---////////////////////
import { nanoid } from "nanoid";

//////////////---Paddle imports---////////////////////
import { initializePaddle, Paddle } from '@paddle/paddle-js';

//////////////---API imports---////////////////////
import { getUserProfile } from "../Pages/Slices/GetUserProfile";
import { updateProfile } from "../AuthPages/SignupSlice/profileUpdate";
import { updateProfileCredits } from "../Pages/Slices/UpdateProfileCredits";



const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()

  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { updateCreditsData, updateCreditsLoader, updateCreditsErrorMessage } = useSelector((state) => state.updateprofilecredits);

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  //const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [card, setCard] = useState(null)
  const [isCheckoutLoaded, setIsCheckoutLoaded] = useState(false);

  // subscription hooks
  const [projectNumber, setProjectNumber] = useState()
  const [messages, setMessages] = useState()


  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState();
  const [credits, setCredits] = useState(0)
  const [panel, setPanel] = useState(false)
  const [device, setDevice] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [itemQuantity, setItemQuantity] = useState()
  const [purchaseData, setPurchaseData] = useState()

  const handleDeviceDetection = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

    if (isMobile) {
      setDevice('Mobile');
    } else if (isTablet) {
      setDevice('Tablet');
    } else {
      console.log("Device is a desktop")
      setDevice('Desktop');
    }
  };

  const togglePreview = () => {
    setPreview(!preview)
  }

  const pushToProfile = async (firstName, lastName, name, userId) => {

    let profileData = {
      first_name: firstName,
      last_name: lastName,
      user_name: name,
      userId: userId
    }

    dispatch(updateProfile(profileData))

  }

  const signOut = async () => {

    try {

      if (localStorage.getItem("__feature_messages_dismissed__") !== null) {
        localStorage.removeItem("__feature_messages_dismissed__");
      }
      const { error } = await supabase.auth.signOut()
      
    } catch (error) {

    }

  }

  useEffect(() => {

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

    return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user.id) {
        console.log("user session: ", session)
        console.log("get profile details")
        dispatch(getUserProfile(session?.user.id))
      }
    })

    return () => authListener.subscription.unsubscribe()

  }, [])

  useEffect(() => {
    if (updateCreditsData) {
      dispatch(getUserProfile(session?.user.id))
    }
  }, [updateCreditsData])


  useEffect(() => {

    if (session) {
      const authToken = process.env.REACT_APP_PADDLE_AUTH_TOKEN
      initializePaddle({
        environment: "sandbox",
        token: authToken,
        checkout: {
          settings: {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
          }
        },
        eventCallback: (checkoutData) => {
          console.log("callback event: ", checkoutData)
          if (checkoutData.name == "checkout.completed") {
            console.log("update purchases")
            console.log("user id: ", session?.user.id)
            setPurchaseData({
              order_id: checkoutData?.data.id,
              transaction_id: checkoutData?.data.transaction_id,
              user_id: session.user?.id,
              status: 'paid',
              purchased_at: new Date(),
              price_id: checkoutData?.data.items[0]?.price_id
            })
            console.log("quantity: ", itemQuantity)
            console.log("new credits value: ", userProfile?.credits + itemQuantity)
            dispatch(updateProfileCredits({
              credits: userProfile?.credits + itemQuantity,
              userId: session.user?.id
            }))
          } else if (checkoutData.name == "checkout.warning") {
            console.log("checkout warning: ", checkoutData.name)
            //toast.error(checkoutData?.error.detail)
          } else if (checkoutData.name == "checkout.error") {
            console.log("checkout failed: ", checkoutData.name)
            //toast.error(checkoutData?.error.detail)
          }
        }
      }).then(
        (paddleInstance) => {
          if (paddleInstance) {
            setPaddle(paddleInstance);
          }
        },
      );
    }

  }, [session]);

  /*
    useEffect(() => {
  
      if (userProfile?.account_type === "Hobbyist") {
        setProjectNumber(1)
        setMessages(10)
      } else if (userProfile?.account_type === "Starter") {
        setProjectNumber(3)
        setMessages(50)
      } else if (userProfile?.account_type === "Growth") {
        setProjectNumber(10)
        setMessages(250)
      } else {
        setProjectNumber(null)
        setMessages(null)
      }
  
      console.log("project number: ", projectNumber)
  
    }, [userProfile])
  */

  const openCheckout = (priceId, quantity, credits) => {

    console.log('credits: ', credits)
    setItemQuantity(credits)

    if (!paddle) return console.log("Paddle not initialized!")

    let items = [{ priceId: priceId, quantity: quantity }]

    paddle?.Checkout.open({
      items: items,
      customer: {
        email: session?.user.email
      },
      customData: {
        validation: {
          type: "checkout",
          timestamp: new Date().toISOString(),
        },
      },
    });

    setPanel(!panel)
  };


  return (
    <AuthContext.Provider value={{ showNav, setShowNav, device, session, projectNumber, messages, itemQuantity, panel, purchaseData, credits, setPanel, setPurchaseData, setCredits, togglePreview, signOut, openCheckout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }