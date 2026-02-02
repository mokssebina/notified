import React, { useEffect } from 'react'

/////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

/////////////---Router imports---////////////////////
import { useNavigate } from 'react-router-dom'

/////////////---Screen imports---////////////////////
import PurchaseItem from '../Components/ScreenElements/PurchasesPageElements/PurchasesItem';
import PurchasesLoader from '../Components/ScreenElements/PurchasesPageElements/PurchasesLoader';
import PageHeader from '../Components/LayoutElements/PageHeader';

/////////////---Material imports---////////////////////
import { Add, Refresh } from '@mui/icons-material'

/////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux'

/////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext'

/////////////---API imports---////////////////////
import { getPurchases, resetGetPurchases } from './Slices/GetPurchasesSlice'
import { updatePurchases } from './Slices/UpdatePurchases';



const Subscription = () => {

  const navigate = useNavigate()
  const { session, panel, setPanel, purchaseData } = useAuth()
  const dispatch = useDispatch()
  const { purchases, purchasesLoading, getPurchasesError } = useSelector((state) => state.getpurchases);
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { updatedPurchases, purchasesError } = useSelector((state) => state.updatepurchases);

  useEffect(() => {
    if (purchaseData) {
      dispatch(updatePurchases(purchaseData))
    }
  }, [purchaseData])

  useEffect(() => {
    if (!purchases?.length) {
      dispatch(getPurchases(session.user?.id))
    }
  }, [])

  useEffect(() => {
    if (purchasesError) {
      toast.error(purchasesError)
    }
  }, [purchasesError])


  const openCredits = () => {
    setPanel(!panel)
  }

  const refreshPurchases = () => {
    dispatch(resetGetPurchases())
    dispatch(getPurchases(session.user?.id))
  }

  return (
    <div style={{ scrollbarWidth: 'none' }} className='relative w-full h-full flex flex-col'>

      <div className='w-full lg:w-10/12 flex flex-col py-4 mx-auto'>

        <PageHeader title="Purchases" />

        <div className='w-full h-12 flex flex-row mx-auto'>

          <button onClick={openCredits} className={`h-12 py-3 px-3 rounded-lg bg-primary text-foreground border border-foreground align-middle`}>
            <div className='flex flex-row space-x-2 align-middle'>
              <p>Buy Credits</p>
            </div>
          </button>

          <button onClick={refreshPurchases} className='relative h-12 py-3 px-3 ml-auto rounded-lg border border-primary text-primary align-middle'>
            <div className='flex flex-row space-x-2 align-middle'>
              <Refresh />
              <p>Refresh</p>
            </div>
          </button>

        </div>

        <div className='w-full h-page mt-12 overflow-y-auto pr-3'>

          {purchasesLoading && <PurchasesLoader />}

          {(!purchasesLoading && purchases) &&
            <>
              {purchases?.map((item) => (
                <PurchaseItem
                  productName={item?.product_name}
                  productPrice={item?.product_price}
                  transactionId={item?.paddle_transaction_id}
                  orderId={item?.paddle_checkout_id}
                  priceId={item?.product_id}
                  purchaseDate={item?.purchase_date}
                />
              ))}
            </>
          }

          {!purchasesLoading && purchases?.length == 0 &&
            <div className='w-full mt-12 md:mt-24'>
              <p className='font-semibold text-base text-foreground text-center'>You don't have any purchases yet...</p>
            </div>
          }

        </div>

      </div>

    </div>
  )
}

export default Subscription