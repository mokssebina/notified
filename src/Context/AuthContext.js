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



const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()

  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [card, setCard] = useState(null)
  const [isCheckoutLoaded, setIsCheckoutLoaded] = useState(false);
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

    //createCard(name, userId)

  }

  const signUpWithEmail = async (firstName, lastName, userName, userEmail, userPassword) => {
    try {
      setLoading(true)

      let { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
      })


      if (data && data?.session) {
        setLoading(false)
        console.log('user data: ', data)
        const postId = nanoid(14)
        let pageData = {
          cardName: 'First page',
          cardTitle: 'First page',
          userId: data.user.id,
          postId: postId,
          type: 'free',
      }
        pushToProfile(firstName, lastName, userName, data.user.id)
        //dispatch(createCard(pageData))
      }

      if (error) {
        setLoading(false)
        console.log('error data: ', error.message)
        toast.error(error.message)
      }

    } catch (error) {
      setLoading(false)
      console.log('error data: ', error)
      toast.error(error.message)
    }

    setLoading(false)

  }

  const signOut = async () => {

    const { error } = await supabase.auth.signOut()

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

    if (session) {
      const authToken = process.env.REACT_APP_PADDLE_AUTH_TOKEN
      initializePaddle({
        environment: 'sandbox',
        token: authToken,
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
          } else if (checkoutData.name == "checkout.warning") {
            console.log("checkout warning: ", checkoutData.name)
            toast.error(checkoutData?.error.detail)
          } else if (checkoutData.name == "checkout.error") {
            console.log("checkout failed: ", checkoutData.name)
            toast.error(checkoutData?.error.detail)
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

  const openCheckout = (priceId, quantity) => {

    console.log('product id: ', quantity)
    setItemQuantity(quantity)

    if (!paddle) return console.log("Paddle not initialized!")

    var settings = {
      allowedPaymentMethods: ["card", "apple_pay", "google_pay"],
      displayMode: "overlay",
      theme: "light",
      locale: "en",
      frameTarget: "checkout-container",
      frameStyle: "min-width: 600px;",
      frameInitialHeight: "450",
      quantity: quantity
    };

    let items = [{ priceId: priceId, quantity: quantity }]

    paddle?.Checkout.open({
      settings: settings,
      items: items,
      customer: {
        email: session?.user.email
      }
    });

    setPanel(!panel)
  };


  return (
    <AuthContext.Provider value={{ showNav, setShowNav, device, session, loading, preview, itemQuantity, panel, purchaseData, credits, setPanel, setPurchaseData, setCredits, togglePreview, signUpWithEmail, signOut, openCheckout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }